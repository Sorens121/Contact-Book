import LoginComponent from '../containers/login/login';
import RegisterComponet from '../containers/register/register';
import ContactsComponent from '../containers/contacts/contact';
import CreateContactsComponent from '../containers/createcontacts/createcontacts';

const routes = [
    {
        path: '/login',
        components: LoginComponent,
        title: 'Login',
        needsAuth: false
    },
    {
        path: '/register',
        components: RegisterComponet,
        title: 'Register',
        needsAuth: false
    },
    {
        path: '/contacts/create',
        components: CreateContactsComponent,
        title: 'Create Contacts',
        needsAuth: true
    },
    {
        path: '/',
        components: ContactsComponent,
        title: 'Contacts',
        needsAuth: true
    }
];

export default routes;