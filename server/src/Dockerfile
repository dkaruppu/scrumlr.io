# Build application
FROM golang:1.19
WORKDIR /go/src/github.com/inovex/scrumlr.io/
COPY ./src .
COPY ./dkaruppu-sjc-mpd85-20240109.crt .
COPY ./dkaruppu-sjc-mpd85-20240109.key .
COPY ./AkamaiClientCA.crt .
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -a -o main

# Start application
FROM alpine:3.18

RUN mkdir /app
COPY --from=0 /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=0 /go/src/github.com/inovex/scrumlr.io/AkamaiClientCA.crt /usr/local/share/ca-certificates/AkamaiClientCA.crt
RUN chmod 644 /usr/local/share/ca-certificates/AkamaiClientCA.crt && update-ca-certificates
COPY --from=0 /go/src/github.com/inovex/scrumlr.io/dkaruppu-sjc-mpd85-20240109.crt ./
COPY --from=0 /go/src/github.com/inovex/scrumlr.io/dkaruppu-sjc-mpd85-20240109.key ./
WORKDIR /app
COPY --from=0 /go/src/github.com/inovex/scrumlr.io/main ./
EXPOSE 8080

CMD ["./main"]
