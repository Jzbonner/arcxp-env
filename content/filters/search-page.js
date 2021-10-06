export default `
data{
    type,
    description {
        basic
    },
    headlines {
        basic
    },
    display_date,
    promo_items {
        basic {
            promo_items {
                basic {
                    caption,
                    type,
                    url
                }
            }
        }
    },
    credits {
        by {
            name,
            type
        }
    },
    taxonomy {
        primary_section {
            description,
            name
        }
    },
} 
`;
