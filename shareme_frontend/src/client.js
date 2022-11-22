import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: "2gn2spoy",
  dataset: 'production',
  apiVersion: '2021-11-16',
  useCdn: true,
  token: "skwPbttXVk8OHn7c7AqzSlvMK1F1LLL16BhDBi7Z5kibRI4jj7CtmEXmUhRlxlyPD9wiy6erDzWbOfcdjxiQj2gSWDVPtsIDSVXnEmBXcSY1v6sOUZ0KhWRjnju4TUbgg6XaEUdA52EuGRBrapZbxFj0BjLEkVRz3mLipoITNZvToeabeAvB",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);