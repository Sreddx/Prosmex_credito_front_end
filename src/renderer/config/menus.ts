export const menus = [
  {
    name: 'Clientes',
    actions: [
      { name: 'Alta de Cliente', permission: 1, route: '/alta-cliente' },
      { name: 'Listado de Clientes', permission: 1, route: '/gestion-clientes' },
      //{ name: 'Editar información de Cliente', permission: 1, route: '/editar-cliente/:id' },
    ],
  },
  {
    name: 'Préstamos',
    actions: [
      { name: 'Creación de Préstamo', permission: 2, route: '/gestion-prestamos' },
      { name: 'Registro de pagos de cobranzas a nivel grupo', permission: 3 },
      { name: 'Realizar corte con superior', permission: 4 },
      //{ name: 'Registro pagos de préstamos a nivel grupo', permission: 5 },
    ],
  },
  {
    name: 'Reportes',
    actions: [
      { name: 'Visualizar Reportes de Rutas', permission: 6 },
      { name: 'Visualizar Reportes Generales', permission: 7 },
    ],
  },
  {
    name: 'Usuarios',
    actions: [
      //{ name: 'Editar Información', permission: 8 },
      { name: 'Crear Usuario', permission: 9, route: '/creacion-usuario' },
      { name: 'Dar de Baja Usuario', permission: 10, route: '/baja-usuario' },
    ],
  },
  {
    name: 'Administración',
    actions: [
      //{ name: 'Creación de Préstamo Mayor a $5000', permission: 11 },
      { name: 'Eliminar Préstamo', permission: 12, route: '/baja-prestamo' },
      { name: 'Asignar Titular a Grupo', permission: 13, route: '/asignacion-titular-grupo' },
      { name: 'Asignar Grupo a Ruta', permission: 14, route: '/asignacion-grupo-ruta' },
    ],
  },
];

export default menus;
