# Build application
FROM golang:1.19
WORKDIR /go/src/github.com/inovex/scrumlr.io/
COPY ./src .

# Copy the client cert & key
COPY ./dkaruppu-sjc-mpd85-20240109.crt .
COPY ./dkaruppu-sjc-mpd85-20240109.key .
# Copy the client CA
COPY ./AkamaiClientCA.crt .
# Copy the root CA
COPY ./AkamaiCorpRoot-G1.crt .

RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -a -o main

# Start application
FROM alpine:3.18

RUN mkdir /app
# Copy over the ca-certificates from the first stage
COPY --from=0 /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
# Install the ca-certificates tool
RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*

# Copy and update the ca-certificate with AkamaiClientCA.crt (client CA)
COPY --from=0 /go/src/github.com/inovex/scrumlr.io/AkamaiClientCA.crt /usr/local/share/ca-certificates/AkamaiClientCA.crt
RUN chmod 644 /usr/local/share/ca-certificates/AkamaiClientCA.crt && update-ca-certificates

# Copy and update the ca-certificate with AkamaiCorpRoot-G1.crt (Root CA)
COPY --from=0 /go/src/github.com/inovex/scrumlr.io/AkamaiCorpRoot-G1.crt /usr/local/share/ca-certificates/AkamaiCorpRoot-G1.crt
RUN chmod 644 /usr/local/share/ca-certificates/AkamaiCorpRoot-G1.crt && update-ca-certificates

COPY --from=0 /go/src/github.com/inovex/scrumlr.io/dkaruppu-sjc-mpd85-20240109.crt ./
COPY --from=0 /go/src/github.com/inovex/scrumlr.io/dkaruppu-sjc-mpd85-20240109.key ./

WORKDIR /app
COPY --from=0 /go/src/github.com/inovex/scrumlr.io/main ./
EXPOSE 8080

CMD ["./main"]
