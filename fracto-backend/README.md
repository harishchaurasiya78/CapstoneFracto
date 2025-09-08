# Harish_Wipro_Backend - Fracto API

## Overview
ASP.NET Core Web API (net8.0) with:
- EF Core (SQL Server)
- JWT Authentication
- Swagger UI
- File uploads (served from /uploads)
- Seed data (specializations, doctors, users)

## Setup
1. Install .NET 8 SDK and SQL Server.
2. Update `appsettings.json` connection string if needed.
3. From project folder run:
   ```bash
   dotnet tool install --global dotnet-ef
   dotnet ef migrations add InitialCreate -p Fracto.Api/Fracto.Api.csproj -s Fracto.Api/Fracto.Api.csproj
   dotnet ef database update -p Fracto.Api/Fracto.Api.csproj -s Fracto.Api/Fracto.Api.csproj
   dotnet run --project Fracto.Api/Fracto.Api.csproj
   ```
4. Swagger available at `/swagger`.

## Seed Users
- user1 / password1 (role: User)
- admin / adminpass (role: Admin)
