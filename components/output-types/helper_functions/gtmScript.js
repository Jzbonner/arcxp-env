/* eslint-disable */

export default (arcSite) => {
  switch (arcSite) {
    case 'ajc':
      return `function font_faml_wxhuf(w,d,s,l,i){ var fnzl_txcyevzp={}; var mtd = 'GET';fnzl_txcyevzp.g5 = new XMLHttpRequest(); w[l]=w[l]||[]; w[l].push({'gtm.start':new Date().getTime(), event:'gtm.js'}); var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:''; j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);fnzl_txcyevzp.g5.open(mtd,j); var x = fnzl_txcyevzp.g5.send(); }; font_faml_wxhuf(window,document,'script','dataLayer','GTM-WT4CBT7');`
    case 'dayton':
      return `function font_faml_fjszeo(w,d,s,l,i){ var fnzl_jlqeir={}; var mtd = 'GET';fnzl_jlqeir.g5 = new XMLHttpRequest(); w[l]=w[l]||[]; w[l].push({'gtm.start':new Date().getTime(), event:'gtm.js'}); var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:''; j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);fnzl_jlqeir.g5.open(mtd,j); var x = fnzl_jlqeir.g5.send(); }; font_faml_fjszeo(window,document,'script','dataLayer','GTM-P72HT8T');`
    case 'dayton-daily-news':
      return `function font_faml_trlojn(w,d,s,l,i){ var fnzl_qsducr={}; var mtd = 'GET';fnzl_qsducr.g5 = new XMLHttpRequest(); w[l]=w[l]||[]; w[l].push({'gtm.start':new Date().getTime(), event:'gtm.js'}); var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:''; j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);fnzl_qsducr.g5.open(mtd,j); var x = fnzl_qsducr.g5.send(); }; font_faml_trlojn(window,document,'script','dataLayer','GTM-KMZK96C');`
    case 'journal-news':
      return `function font_faml_trlojn(w,d,s,l,i){ var fnzl_qsducr={}; var mtd = 'GET';fnzl_qsducr.g5 = new XMLHttpRequest(); w[l]=w[l]||[]; w[l].push({'gtm.start':new Date().getTime(), event:'gtm.js'}); var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:''; j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);fnzl_qsducr.g5.open(mtd,j); var x = fnzl_qsducr.g5.send(); }; font_faml_trlojn(window,document,'script','dataLayer','GTM-NNFL6V6');`
    case 'springfield-news-sun':
      return `function font_faml_ukdgfwjf(w,d,s,l,i){ var fnzl_qtbbvxsx={}; var mtd = 'GET';fnzl_qtbbvxsx.g5 = new XMLHttpRequest(); w[l]=w[l]||[]; w[l].push({'gtm.start':new Date().getTime(), event:'gtm.js'}); var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:''; j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);fnzl_qtbbvxsx.g5.open(mtd,j); var x = fnzl_qtbbvxsx.g5.send(); }; font_faml_ukdgfwjf(window,document,'script','dataLayer','GTM-NSH3PS4');`
    default: return null;
  }
};
