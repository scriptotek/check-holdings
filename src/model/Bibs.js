import { get } from 'lodash/object';
import { find, orderBy } from 'lodash/collection';
import Bib from '@/model/Bib'

export default class Bibs {

    constructor(data) {
        this.data = data.map(x => new Bib(x))
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

    open_nodes() {
      return this.data.map(x => x.data.id)
    }

    treedata() {
        return orderBy(this.data, x => x.data.pub_year, 'desc')
        .map(bib => ({
          id: bib.data.id,
          name: bib.title(),
          edition: bib.edition(),
          link: `https://${process.env.VUE_APP_PRIMO_HOST}/primo-explore/search?query=any,contains,${bib.data.isbns[0]}&vid=${process.env.VUE_APP_PRIMO_VIEW}`,

          children: bib.data.holdings
            .filter(h => h.institution == process.env.VUE_APP_ALMA_INST)
            .map(holding => ({
              id: holding.holding_id,
              name: `${holding.library_name} ${holding.location} ${holding.callcode || '(mangler oppstillingssignatur)'}`,
              summary: `${holding.total_items - holding.unavailable_items} av ${holding.total_items} eks. på hylla`,
              children: holding.items.map(item => ({
                id: item.pid,
                name: `${item.barcode}: ${item.process_type.desc || 'On shelf'}`,
              }))
            }))
            .concat(
              bib.data.portfolios
                .map(port => ({
                  id: port.id,
                  name: `E-book from ${port.collection_name}`,
                  ebooklink: `https://${process.env.VUE_APP_ALMA_HOST}/view/uresolver/${process.env.VUE_APP_ALMA_INST}/openurl?u.ignore_date_coverage=true&rft.mms_id=${bib.data.id}&rfr_id=info:sid/primo.exlibrisgroup.com&svc_dat=viewit`,
                }))
            )
        })).map(obj => {
            if (!obj.children.length) {
                obj.children = [{
                    id: `${obj.id}H`,  // Just an unique key
                    name: 'Not available at UiO',
                    available: false,
                    parent_name: obj.name,
                }]
            }
            return obj
        })
    }

}
