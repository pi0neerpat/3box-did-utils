import { randomBytes } from '@stablelib/random'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'

// Serverside
// import { DID } from 'dids'
import KeyResolver from '@ceramicnetwork/key-did-resolver'

// Resolver
import Ceramic from '@ceramicnetwork/http-client'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'

const seed = randomBytes(32)
const provider = new Ed25519Provider(seed)
const did = new DID({ provider })
await did.authenticate()

// log the DID
console.log(did.id)

// create JWS
const jws = did.createJWS({ hello: 'world' })
console.log(jws)


// Serverside
const did = new DID({ resolver: { registry: KeyResolver.getResolver() } })

const jws = // jws from request

await did.verifyJWS(jws) // will throw if the jws is incorrect


// Reolver

const ceramic = new Ceramic(<url-of-ceramic-gateway>)

const registry = {
	...ThreeIdResolver.getResolver(),
	...KeyResolver.getResolver()
}
const did = new DID({ resolver: { registry } })
