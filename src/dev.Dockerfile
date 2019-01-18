FROM microsoft/dotnet:1.1-runtime-jessie

ADD ImageServer/bin/Debug/netcoreapp1.1/debian.8-x64/publish/ app

WORKDIR /app
ENV ASPNETCORE_ENVIRONMENT Development
ENV ASPNETCORE_URLS http://+:5000
CMD ["dotnet", "ImageServer.dll"]
