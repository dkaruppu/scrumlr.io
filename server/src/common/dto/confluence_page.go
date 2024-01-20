package dto

type ConfluencePage struct {
	// The id of the page
	ID string `json:"id"`

	// The type of page
	Type string `json:"type"`

	// The status of page
	Status string `json:"status"`

	// The title of page
	Title string `json:"title"`

	// The version information of the page
	Version ConfluencePageVersion `json:"version,omitempty"`

	// The body of the page
	Body ConfluencePageBody `json:"body,omitempty"`
}

// Update Confluence Page Request
type UpdateConfluencePageRequest struct {
	Version ConfluencePageVersion `json:"version"`
	Title   string                `json:"title"`
	Type    string                `json:"type"`
	Body    ConfluencePageBody    `json:"body"`
}
