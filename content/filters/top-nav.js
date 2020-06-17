export default `
{
social {
    twitter
    facebook
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
_id
}`;
