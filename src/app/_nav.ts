import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    title: true,
    name: 'IOT Control'
  },
  {
    name: 'Colors',
    url: '/theme/colors',
    icon: 'cui-rss'
  },
  {
    title: true,
    name: 'Managements'
  },
  {
    name: 'Devices',
    url: '/base',
    icon: 'icon-wrench',
    children: [
      {
        name: 'All Devices',
        url: '/devices/alldevices',
        icon: 'icon-list'
      },
      // {
      //   name: 'Loan',
      //   url: '/devices/loan',
      //   icon: 'cui-dollar'
      // }
    ]
  },
  {
    name: 'Members',
    url: '/members',
    icon: 'icon-people',
    children: [
      {
        name: 'Members(CEEC)',
        url: '/members/nowmembers',
        icon: 'icon-user-following'
      },
      {
        name: 'Members',
        url: '/members/oldmembers',
        icon: 'icon-user-unfollow'
      }
    ]
  },
  {
    name: 'Exhibit',
    url: '/exhibit',
    icon: 'icon-people',
    children: [
      {
        name: 'Loan',
        url: '/exhibit/loan',
        icon: 'icon-user-following'
      },
      {
        name: 'Fine',
        url: '/exhibit/owe',
        icon: 'icon-user-unfollow'
      }
    ]
  },
  // {
  //   name: 'Charts',
  //   url: '/charts',
  //   icon: 'icon-pie-chart'
  // },
  // {
  //   name: 'Icons',
  //   url: '/icons',
  //   icon: 'icon-star',
  //   children: [
  //     {
  //       name: 'CoreUI Icons',
  //       url: '/icons/coreui-icons',
  //       icon: 'icon-star',
  //       badge: {
  //         variant: 'success',
  //         text: 'NEW'
  //       }
  //     },
  //     {
  //       name: 'Flags',
  //       url: '/icons/flags',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Font Awesome',
  //       url: '/icons/font-awesome',
  //       icon: 'icon-star',
  //       badge: {
  //         variant: 'secondary',
  //         text: '4.7'
  //       }
  //     },
  //     {
  //       name: 'Simple Line Icons',
  //       url: '/icons/simple-line-icons',
  //       icon: 'icon-star'
  //     }
  //   ]
  // },
  // {
  //   name: 'Notifications',
  //   url: '/notifications',
  //   icon: 'icon-bell',
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/notifications/alerts',
  //       icon: 'icon-bell'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/notifications/badges',
  //       icon: 'icon-bell'
  //     },
  //     {
  //       name: 'Modals',
  //       url: '/notifications/modals',
  //       icon: 'icon-bell'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   icon: 'icon-calculator',
  //   badge: {
  //     variant: 'info',
  //     text: 'NEW'
  //   }
  // },
  {
    divider: true
  },
  {
    title: true,
    name: 'Contacts',
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'CEEC',
    url: 'https://www.facebook.com/Computer.Engineering.Embedded.Club',
    icon: 'fa fa-facebook-official',
  }
];
