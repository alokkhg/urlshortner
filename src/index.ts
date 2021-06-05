// Initialize all the controllers from here to return the routes
import App from './app'
import UrlShortnerController from './controller/urlshortner.controller'
import FizzbuzzController from './controller/urlshortner.controller'

const app = new App(
    [
        new UrlShortnerController(),
    ]
)

app.listen()
