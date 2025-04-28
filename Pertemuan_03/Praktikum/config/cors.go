package config

var allowedOrigins = []string{
	"https://localhost:3000",
	"https://indrariksa.github.io",
}

func GetAllowedOrigins() []string {
	return allowedOrigins
}
