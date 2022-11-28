const sanityClient = require('@sanity/client')

const prodClient = sanityClient({
    projectId: 'pzvwvuve',
    dataset: 'production',
    apiVersion: '2021-11-15', // use current UTC date - see "specifying API version"!
    token: 'skIobqHhweYAnHiy1VRIt5RmC51w1aoTF4maxLeIdyIukrlX73vznMlHGsoBNPX7It1TerwR8kSkx4GOuANJCIYwBtGE7BEOXK5TRZcxoIYoL2r4G5OQNTrdypEaJOq4U73QoOF8f5YqLwTFm4almDfrkN5rfFYA8lbKj9cC7Fdb56RLwblG', // or leave blank for unauthenticated usage
    useCdn: false, // `false` if you want to ensure fresh data
})


const testClient = sanityClient({
    projectId: 'pzvwvuve',
    dataset: 'test',
    apiVersion: '2021-11-15', // use current UTC date - see "specifying API version"!
    token: 'skIobqHhweYAnHiy1VRIt5RmC51w1aoTF4maxLeIdyIukrlX73vznMlHGsoBNPX7It1TerwR8kSkx4GOuANJCIYwBtGE7BEOXK5TRZcxoIYoL2r4G5OQNTrdypEaJOq4U73QoOF8f5YqLwTFm4almDfrkN5rfFYA8lbKj9cC7Fdb56RLwblG', // or leave blank for unauthenticated usage
    useCdn: false, // `false` if you want to ensure fresh data
})


module.exports = { prodClient, testClient }