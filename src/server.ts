import express from 'express'
import flash from 'express-flash'
import session from 'express-session'
import { routerRoot } from './Routes/root/root.routes'
import cookieParser from 'cookie-parser'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('batatinhafrita123'))
app.use(session({
  secret: 'batatinhafrita123',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(flash()) // permite o compartilhamento de informações entre rotas
app.set("view engine", "ejs")

app.use('/', routerRoot)

app.listen(3000, () => {
  console.log('Server is running on port 3000. 😅')
})