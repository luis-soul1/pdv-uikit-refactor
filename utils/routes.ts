import { TGenericId } from 'types/commons/types'

export const routes = {
  public: {
    '404': '/404',
    uikit: '/uikit'
  },
  private: {
    home: '/',
    demo: '/demo',
    schools: '/configuraciones/colegios',
    createSchool: '/configuraciones/colegios/crear',
    editSchool: (id: TGenericId) => `/configuraciones/colegios/editar/${id}`,
    profiles: '/configuraciones/perfiles',
    editProfile: (id: TGenericId) => `/configuraciones/perfiles/${id}`,
    subjects: '/configuraciones/asignaturas-curriculares',
    holidays: '/configuraciones/feriados',
    grades: '/configuraciones/niveles',
    teachingTypes: '/configuraciones/tipos-de-ensenanza',
    platforms: '/configuraciones/plataformas',
    editPlatform: (id: TGenericId) => `/configuraciones/plataformas/${id}`,
    editModule: (id: TGenericId, platformId: TGenericId) => `/configuraciones/plataformas/${platformId}/modulo/${id}`,
    editPage: (id: TGenericId, moduleId: TGenericId, platformId: TGenericId) =>
      `/configuraciones/plataformas/${platformId}/modulo/${moduleId}/pagina/${id}`
  },
  auth: {
    login: '/auth/login',
    recovery: '/auth/recuperar-contrasena',
    changePassword: '/auth/cambiar-contrasena'
  }
}
