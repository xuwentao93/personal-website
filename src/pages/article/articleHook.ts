import useSWR from "swr";
import { useParams } from 'react-router-dom';
import { ArticleType } from '@/constant/enum';
import { GetArticleType, getArticle } from "@/api";

interface ArticleMsgType {
  // 文章内容, markdown 字符串和
  text: string,
  // 写作时间
  time: number,
  // 文章标题
  title: string,
  // 文章类型
  type: ArticleType.life | ArticleType.frontend | ArticleType.algorithm | ArticleType.network | ArticleType.other
  // 文章子类型
  subtype?: string,
  // 浏览次数
  view: number
}


export function useArticle(sid: string): { article: ArticleMsgType, loading: boolean } {
  const id = useParams()?.id || sid;
  const { data, isLoading } = useSWR(() => ({ url: 'getAricle', id }), async (params) => {
    const { id } = params;
    const result = await getArticle({ id });

    return result;
  });

  return {
    article: data?.data || {},
    loading: isLoading
  };
}