export default class BaseController {
  constructor($state, $translate, userservice, utilsservice) {
    this.$state = $state;
    this.$translate = $translate;
    this.userservice = userservice;
    this.utilsservice = utilsservice;

    this.showSidebar = true;

    this.currentUser = this.userservice.currentUser;
    this.menuItems = [
      {
        children: [],
        collapsed: true,
        iconClass: 'fa-desktop',
        label: $translate.instant('DASHBOARD'),
        uiSref: 'dashboard'
      },
      {
        children: [
          { iconClass: 'fa-cubes', label: $translate.instant('INVENTORY_LIST'), uiSref: 'inventory' },
          { iconClass: 'fa-sort-numeric-asc', label: $translate.instant('UOM_LIST'), uiSref: 'uom' },
        ],
        collapsed: true,
        iconClass: 'fa-list',
        label: $translate.instant('INVENTORY'),
      },
      {
        children: [
          { iconClass: 'fa-history', label: $translate.instant('TRANSACTIONS_HISTORY'), uiSref: 'transactions-history' },
          { iconClass: 'fa-shopping-cart', label: $translate.instant('PURCHASE'), uiSref: 'transactions-purchase' },
          { iconClass: 'fa-truck', label: $translate.instant('SALE'), uiSref: 'transactions-sale' },
        ],
        collapsed: true,
        iconClass: 'fa-money',
        label: $translate.instant('TRANSACTIONS'),
      },
      { children: [], collapsed: true, iconClass: 'fa-users', label: $translate.instant('CLIENTS'), uiSref: 'clients' },
    ];

    this.activate();

    this.$inject = ['$state', '$translate', 'userservice', 'utilsservice'];
  }

  isActive(item) {
    return (item.uiSref && this.$state.current.name.includes(item.uiSref)) || (item.children || []).find((child) => {
      return (child.uiSref && this.$state.current.name.includes(child.uiSref));
    });
  }

  logOut() {
    const config = {
      bodyMsg: this.$translate.instant('LOGOUT_MODAL_BODY'),
      titleMsg: this.$translate.instant('LOGOUT_MODAL_TITLE'),
    };
    this.utilsservice.confirmationDialog(() => {
      this.userservice.logOut().then((loggedOut) => {
        if(loggedOut) {
          this.$state.go('login');
        }
      });
    }, null, config);
  }

  redirect(item, collapse) {
    if(item.uiSref) {
      this.$state.go(item.uiSref);
    } else {
      item.collapsed = !item.collapsed;
    }
  }

  toggleCollapse(item) {
    item.collapse = !item.collapse;
  }

  activate() {
    console.log('BaseController activated.');
  }
}
