export default `
{
site {
    site_logo_image
}
children {
        _id
        site {
            site_url
        }
        navigation {
            nav_title
        }
        children {
            _id
            site {
                site_url
            }
            navigation {
                nav_title
            }
        }
        
}
}`;
