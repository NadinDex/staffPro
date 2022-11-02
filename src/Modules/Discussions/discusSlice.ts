import { DiscussionDto, DiscusCommentDto } from "../../Dto/discussionDto";
import { createSlice } from "@reduxjs/toolkit";

const initialDiscussions = [
  {
    id: 1,
    title: "Имеется спорная точка зрения",
    text:
      "Имеется спорная точка зрения, гласящая примерно следующее: сторонники тоталитаризма в науке лишь добавляют фракционных разногласий и функционально разнесены на независимые элементы. В своём стремлении улучшить пользовательский опыт мы упускаем, что сторонники тоталитаризма в науке являются только методом политического участия и превращены в посмешище, хотя само их существование приносит несомненную пользу обществу. Но элементы политического процесса, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут объективно рассмотрены соответствующими инстанциями.",
    authorId: 1,
  },
  {
    id: 2,
    title: "Ясность нашей позиции очевидна",
    text:
      "Ясность нашей позиции очевидна: высококачественный прототип будущего проекта говорит о возможностях укрепления моральных ценностей. Прежде всего, внедрение современных методик, а также свежий взгляд на привычные вещи — безусловно открывает новые горизонты для стандартных подходов. Предварительные выводы неутешительны: дальнейшее развитие различных форм деятельности создаёт необходимость включения в производственный план целого ряда внеочередных мероприятий с учётом комплекса дальнейших направлений развития.",
    authorId: 1,
  },
  {
    id: 3,
    title: "Разнообразный и богатый опыт",
    text:
      "Разнообразный и богатый опыт говорит нам, что разбавленное изрядной долей эмпатии, рациональное мышление позволяет выполнить важные задания по разработке прогресса профессионального сообщества. Но непосредственные участники технического прогресса набирают популярность среди определенных слоев населения, а значит, должны быть ассоциативно распределены по отраслям. Предварительные выводы неутешительны: укрепление и развитие внутренней структуры не даёт нам иного выбора, кроме определения поэтапного и последовательного развития общества!",
    authorId: 1,
  },
];

export interface DiscusState {
  discussions: DiscussionDto[];
  error?: string;
}

const initialState = {
  isFetching: false,
  discussions: initialDiscussions,
} as DiscusState;

const discuccionsSlice = createSlice({
  name: "dicsus",
  initialState: initialState,
  reducers: {
    addComment: (state, action) => {
      let comment = action.payload as DiscusCommentDto;
      const dicsus = state.discussions.find(
        (d) => d.id == (action.payload as DiscusCommentDto).discussionId
      );
      if (dicsus) {
        comment.id = dicsus.comments
          ? Math.max(...dicsus.comments.map((x: DiscusCommentDto) => x.id))
          : 1;
        if (!dicsus.comments) dicsus.comments = new Array<DiscusCommentDto>();
        comment.addedOn = new Date();
        dicsus.comments.push(comment);
      }
    },
    addDiscus: (state, action) => {
      let discuss = action.payload as DiscussionDto;
      discuss.id = state.discussions
        ? Math.max(...state.discussions.map((x: DiscussionDto) => x.id))
        : 1;
      discuss.addedOn = new Date();
      state.discussions.push(discuss);
    },
  },
});

export const discuccionsActions = { ...discuccionsSlice.actions };
export default discuccionsSlice.reducer;
