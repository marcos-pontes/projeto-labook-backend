export class Posts {
    constructor(
        private id:string,
        private creatorId:string,
        private content :string,
        private likes: number,
        private deslike: number,
        private created_at: string,
        private updated_at : string
    ){}
    public getId():string{
        return this.id;
    }

    public getCreatorId():string{
        return this.creatorId;
    }

    public getContent():string{
        return this.content;
    }

    public getLikes():number{
        return this.likes;
    }
    public getDeslike():number{
        return this.deslike;
    }
    public getCreatedAt():string{
        return this.created_at;
    }

    public getUpdatedAt():string{
        return this.updated_at;
    }

    public setId(value:string):void{
        this.id = value;
    }
    public setCreatorId(value:string):void{
        this.created_at = value;
    }

    public setContent(value:string):void{
        this.content = value;
    }

    public setLike(value:number):void{
        this.likes = value
    }

    public setdeslike(value:number):void{
        this.deslike = value
    }
    public setCreatedAt(value:string):void{
        this.created_at = value
    }

    public setUpdatedAt(value:string):void{
       this.updated_at = value
    }

}