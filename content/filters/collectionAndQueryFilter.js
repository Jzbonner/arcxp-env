export default `{
    canonical_url
    content_elements {
        type
        content
        url
        caption
        raw_oembed {
            type
            url
            _id
        }
    }
    credits {
        by {
            name
        }
    }
    desciption {
        basic
        meta_title
    }
    display_date
    first_publish_date
    firstInlineImage {
        alt_text
        url
        height
        width
        caption
        credits {
            affiliation {
                by {
                    id
                }
            }
            by {
                name
                type
            }
        }
    }
    headlines {
        basic
    }
    label {
        hide_timestamp
        basic {
            text
        }
    }
    last_updated_date
    promo_items {
        basic {
            alt_text
            caption
            content_elements {
                caption
                url
            }
            credits {
                affiliation {
                    by {
                        id
                    }
                }
                by {
                    name
                    type
                }
            }
            height
            headlines {
                basic
            }
            promo_image {
                url
            }
            promo_items {
                basic {
                    alt_text
                    url
                    width
                    height
                    caption
                    subtitle
                    caption
                    type
                }
            }
            streams {
                stream_type
                url
            }
            subtitle
            type
            url
            width
        }
    }
    taxonomy {
        tags {
            text
        }
        sections {
            type
            name
            path
            additional_properties {
                original {
                    inactive
                }
            }
        }
        primary_section {
            path
            name
            referent
        }
    }
    type
    website_url
    _id
  }
}`;
