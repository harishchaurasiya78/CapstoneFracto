using Fracto.Api.Data;
using Fracto.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// Swagger with JWT support
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Fracto API", Version = "v1" });

    // Security scheme
    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Enter JWT as: Bearer {your token}",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,  // 👈 Important for Swagger
        Scheme = "Bearer",
        BearerFormat = "JWT"
    };

    c.AddSecurityDefinition("Bearer", securityScheme);

    // Apply to all endpoints
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// DB
builder.Services.AddDbContext<FractoContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Custom services
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<FileService>();
builder.Services.AddScoped<DataSeeder>();

// JWT key
var jwtKey = builder.Configuration["Jwt:Key"] ?? "this_is_a_super_long_secret_key_1234567890!";
var keyBytes = Encoding.UTF8.GetBytes(jwtKey);

// JWT Auth
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
        ClockSkew = TimeSpan.Zero
    };

    // Debugging events
    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = ctx =>
        {
            Console.WriteLine("❌ Authentication failed: " + ctx.Exception.Message);
            return Task.CompletedTask;
        },
        OnChallenge = ctx =>
        {
            Console.WriteLine("⚠️ Challenge triggered: " + ctx.ErrorDescription);
            return Task.CompletedTask;
        },
        OnMessageReceived = ctx =>
        {
            Console.WriteLine("📩 Token received: " + ctx.Token);
            return Task.CompletedTask;
        }
    };
});

// 🔹 CORS Added (Angular ke liye allow)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy.WithOrigins("http://localhost:4200") // Angular Dev Server
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

// 🔹 Use CORS
app.UseCors("AllowAngular");

// Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
});

// Auth middleware
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Ensure DB seeded
using (var scope = app.Services.CreateScope())
{
    var seeder = scope.ServiceProvider.GetRequiredService<DataSeeder>();
    await seeder.SeedAsync();
}

// Static files
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "Uploads")
    ),
    RequestPath = "/uploads"
});

app.Run();