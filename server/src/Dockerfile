# Build application
FROM golang:1.19
WORKDIR /go/src/github.com/inovex/scrumlr.io/
COPY ./ .
COPY ../dkaruppu-sjc-mpd85-20240109.crt .
COPY ../dkaruppu-sjc-mpd85-20240109.key .
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -a -o main

# Start application
FROM alpine:3.18

RUN mkdir /app
COPY --from=0 /go/src/github.com/inovex/scrumlr.io/dkaruppu-sjc-mpd85-20240109.crt ./
COPY --from=0 /go/src/github.com/inovex/scrumlr.io/dkaruppu-sjc-mpd85-20240109.key ./
WORKDIR /app
COPY --from=0 /go/src/github.com/inovex/scrumlr.io/main ./
EXPOSE 8080

CMD ["./main"]
