import Authorizations from '../authorizations.js';
import Repository from '../models/repository.js';
import PhotoModel from '../models/photo.js';
//import PhotoLikeModel from '../models/photoLike.js';
import Controller from './Controller.js';

export default
    class Photos extends Controller {
    constructor(HttpContext) {
        super(HttpContext, new Repository(new PhotoModel()), Authorizations.user());
       // this.photoLikesRepository = new Repository(new PhotoLikeModel());
    }
    //GET : /accounts/conflict?Id=...&Email=.....
    conflict() {
        if (this.repository != null) {
            let id = this.HttpContext.path.params.Id;
            let title = this.HttpContext.path.params.Title;
            if (id && title) {
                let prototype = { Id: id, Title: title };
                this.HttpContext.response.updated(this.repository.checkConflict(prototype));
            } else
                this.HttpContext.response.updated(false);
        } else
            this.HttpContext.response.updated(false);
    }
}