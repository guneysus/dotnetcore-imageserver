FROM microsoft/dotnet:sdk AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY src/ImageServer/*.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY src/ImageServer/ ./
RUN dotnet publish -c Debug --runtime debian.8-x64 -o out

# --------------------------------------------

FROM microsoft/dotnet:1.1-runtime-jessie

# ADD ImageServer/bin/Debug/netcoreapp1.1/debian.8-x64/publish/ app
COPY --from=build-env /app/out /app

WORKDIR /app
ENV ASPNETCORE_ENVIRONMENT Development
ENV ASPNETCORE_URLS http://+:5000

VOLUME [ "/app/wwwroot" ]
CMD ["dotnet", "ImageServer.dll"]


