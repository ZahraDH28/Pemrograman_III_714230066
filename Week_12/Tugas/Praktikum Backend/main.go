package main

import (
	"fmt"
	"inibackend/config"
	"inibackend/router"
	"os"
	"strings"

	_ "inibackend/docs"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func init() {

	if _, err := os.Stat(".env"); err == nil {
		err := godotenv.Load()
		if err != nil {
			fmt.Println("Gagal Memuat File .env")

		} else {
			fmt.Println("file env dimuat (local)")
		}
	}
}

// @title SWAGGER PEMROGRAMAN III
// @version 1.0
// @description Swagger Untuk Backend menggunakan golang dan framework Fiber

// @contact.name API Support
// @contact.url https://github.com/ZahraDH28
// @contact.email diahandokozahra29@gmail.com
// @BasePath /
// @schemes http, https
// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
func main() {

	app := fiber.New()

	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins:     strings.Join(config.GetAllowedOrigins(), ","),
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowCredentials: true,
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
	}))

	router.SetupRoutes(app)

	app.Use(func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  fiber.StatusNotFound,
			"message": "Not Found",
		})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}

	fmt.Println(app.Listen(":" + port))
}
