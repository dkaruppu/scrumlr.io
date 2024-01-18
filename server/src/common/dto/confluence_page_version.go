package dto

type ConfluencePageVersion struct {
	// The type of page
	Message string `json:"message"`

	// The status of page
	Number int `json:"number"`
}
