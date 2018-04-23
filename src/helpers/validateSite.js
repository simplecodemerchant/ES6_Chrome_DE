export default (sites) => {
    const current_site = window.location.host;
    let search;

    for ( let site of sites ){
        site = site.trim();

        search = new RegExp(site);

        if ( site && current_site.match(search) ){
            return true;
        }
    }
    return false;
}