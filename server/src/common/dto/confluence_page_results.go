package dto

import (
	"net/http"
)

type ConfluencePageResults struct {
	// The page search results
	Results []ConfluencePage `json:"results"`
	// Number of pages returned
	Size int `json:"size"`
}

func (*ExportToConfluencePageRequest) Render(_ http.ResponseWriter, _ *http.Request) error {
	return nil
}

// Export To Confluence Page Request.
type ExportToConfluencePageRequest struct {
	// The id of the confluence page
	PageTitle string `json:"pageTitle"`
}
