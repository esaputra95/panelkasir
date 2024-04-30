import { ArticleTypeEnum, ArticlesStatusEnum } from "../../interfaces/articles/ArticleInterface";

export const ArticleDummy = {
    category_id:0,
    title: '',
    content:'',
    status: 'publish' as ArticlesStatusEnum.publish,
    type:'berbagi' as ArticleTypeEnum.berbagi
}

export const ArticleCategoryDummy = {
    name: ''
}