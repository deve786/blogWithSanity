import client from '@sanity/client';

export default client({
    projectId:'40rf11bs',
    dataset:'production',
    useCdn:'true',
    apiVersion:'2023-05-21'
});