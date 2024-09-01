const getApiEndpoint = (route: string, id?: number): string => {
  switch (route) {
    case 'usuarios':
      return id ? `/users/${id}` : '/users/';
    case 'clientes':
      return id ? `/clientes/${id}` : '/clientes/';
    case 'prestamos':
      return id ? `/prestamos/${id}` : '/prestamos/';
    default:
      throw new Error(`Unknown route: ${route}`);
  }
};

export default getApiEndpoint;
