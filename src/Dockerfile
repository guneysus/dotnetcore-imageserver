# FROM microsoft/dotnet:1.1-runtime-jessie
# FROM microsoft/aspnetcore:1.1
FROM microsoft/aspnetcore:1.1-nanoserver

ADD dist app
WORKDIR /app
ENV ASPNETCORE_ENVIRONMENT Development
ENV ASPNETCORE_URLS http://+:5000
CMD ["ImageServer.exe"]


