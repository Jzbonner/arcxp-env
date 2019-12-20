export default `
typeBasicPromoItems{
type:String
url:String
}

typeDescription{
basic:String
}

typeHeadlines{
basic:String
}

typePromoItems{
basic:BasicPromoItems
}

typeSubheadlines{
basic:String
}

typePublishDate{
type:String
}

typeCredits{
type:Array
}

typeQuery{
type:String!
version:String!
description:Description
headlines:Headlines
promo_items:PromoItems
subheadlines:Subheadlines
publish_date:PublishDate
credits:Credits
}
`;
