package common

import (
	"crypto/tls"
	"errors"

	"scrumlr.io/server/logger"
)

func GetTlsConfig() (*tls.Config, error) {
	log := logger.Get()
	certFile := "../dkaruppu-sjc-mpd85-20240109.crt" //Need to be changed later
	keyFile := "../dkaruppu-sjc-mpd85-20240109.key"  //Need to be changed later
	cert, err := tls.LoadX509KeyPair(certFile, keyFile)

	if err != nil {
		log.Error(err)
		return nil, errors.New("Error reading the TLS cert & key pair")
	}

	tlsConfig := &tls.Config{
		Renegotiation: tls.RenegotiateOnceAsClient,
		Certificates:  []tls.Certificate{cert},
	}
	return tlsConfig, nil
}
