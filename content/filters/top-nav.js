export default `
{
site {
    site_logo_image
    site_logo_image_small
    site_logo_image_small_inverse
}
children {
        _id
        site {
            site_url
            section_url_open_new_tab
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
