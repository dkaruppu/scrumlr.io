# Build application
FROM golang:1.19
WORKDIR /go/src/github.com/inovex/scrumlr.io/
COPY ./ .
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -a -o main

# Start application
FROM alpine:3.18

RUN mkdir /app
WORKDIR /app
RUN mkdir /cert-key-pair
COPY --from=0 /go/src/github.com/inovex/scrumlr.io/server/dkaruppu-sjc-mpd85-20240109.crt ./cert-key-pair
COPY --from=0 /go/src/github.com/inovex/scrumlr.io/server/dkaruppu-sjc-mpd85-20240109.key ./cert-key-pair
COPY --from=0 /go/src/github.com/inovex/scrumlr.io/main ./
EXPOSE 8080

CMD ["./main"]
