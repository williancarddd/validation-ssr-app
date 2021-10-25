import { Request,Response } from 'express'
import emailValid from 'email-validator'
interface IDatauser {
  name: string
  email: string
  password: string
}
class RootController {
  protected pageIndex: string

  constructor(pageIndex: string) {
    this.pageIndex = pageIndex
  }

  handleGet(req:Request, res:Response ): void{
    const err = req.flash('error')
    const permDataError = req.flash('dataUser')
    return res.render(this.pageIndex, {errInfo: err[0], permDataError} )
  }

  handlePost(req: Request, res:Response): void {
    const  {name, email, password }: IDatauser = req.body
    const infoUser = { name,email,password }
    try {
      // lógica de validação funciona assim.
      if(!emailValid.validate(email)) {
        throw new Error("email invalid.")
      }
      if(name === undefined || name === '') {
        throw new Error("name invalid")
      }
      if(password === undefined || password === '' || password.length <= 6) {
        throw new Error("password invalid")
      }

      res.send(infoUser)
    } catch({message}) {
      const message_err = message as string
      req.flash('error', message_err)
      req.flash('dataUser', Object.values(infoUser))
      res.redirect('/')
    }
  }
}

const rootController = new RootController("index")
export { rootController }