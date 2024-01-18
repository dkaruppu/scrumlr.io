package dto

import (
	"net/http"
)

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
	Version ConfluencePageVersion `json:"version"`

	// The body of the page
	Body ConfluencePageBody `json:"body"`
}

func (*ExportToConfluencePageRequest) Render(_ http.ResponseWriter, _ *http.Request) error {
	return nil
}

// Export To Confluence Page Request.
type ExportToConfluencePageRequest struct {
	// The id of the confluence page
	PageId string `json:"pageId"`
}

// Update Confluence Page Request
type UpdateConfluencePageRequest struct {
	Version ConfluencePageVersion `json:"version"`
	Title   string                `json:"title"`
	Type    string                `json:"type"`
	Body    ConfluencePageBody    `json:"body"`
}
