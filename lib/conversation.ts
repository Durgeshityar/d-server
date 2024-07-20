import { db } from '@/lib/db'

export const getOrCreateConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  let conversation =
    (await findConversation(memberOneId, memberTwoId)) ||
    (await findConversation(memberTwoId, memberOneId))

  if (!conversation) {
    conversation = await CraeteNewConversation(memberOneId, memberTwoId)
  }
  return conversation
}

const findConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.conversations.findFirst({
      where: {
        AND: [{ memberOneId }, { memberTwoId }],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    })
  } catch {
    return null
  }
}

const CraeteNewConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  try {
    return await db.conversations.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    })
  } catch {
    return null
  }
}
