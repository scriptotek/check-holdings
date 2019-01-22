import { get } from 'lodash/object';
import { find, sortBy } from 'lodash/collection';

export default class Bib {

    constructor(data) {
        this.data = data
        // console.log(data)

        // Object.keys(data).forEach(key => this[key] = data[key]);

        // this.id = get(data, 'pnx.control.recordid.0');
        // this.title = get(data, 'pnx.display.title.0');
        // this.date = get(data, 'pnx.display.creationdate.0');
        // this.type = get(data, 'pnx.display.type.0');
        // this.format = get(data, 'pnx.display.format.0') || '';
        // this.publisher = get(data, 'pnx.display.publisher.0');
        // this.creator = get(data, 'pnx.display.creator.0');
        // this.edition = get(data, 'pnx.display.edition.0');
        // this.ddc = get(data, 'pnx.facets.lfc10');

        // this.frbr = get(data, 'pnx.facets.frbrtype.0') == '5';


        // this.delivery = get(data, 'pnx.delivery.delcategory', []).map(x => x.split('$$I')).filter(x => x[1] == 'UBO');

        // this.link = `https://bibsys-almaprimo.hosted.exlibrisgroup.com/primo-explore/fulldisplay?docid=${this.id}&context=L&vid=${vid}&search_scope=${scope}&tab=default_tab&lang=no_NO`;
    }

    title() {
        return this.data.title;  //.replace(/[/;,. ]+$/g, '');
    }

    edition() {
        let x = this.data.edition ? `${this.data.edition} ${this.data.pub_year}` : this.data.pub_year;
        return `(${x})`
    }

    electronic_access() {
        return get(this.data, 'fulltext');
    }
}
