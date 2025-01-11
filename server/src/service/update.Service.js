export const updateStatus = async (entidade, statusAtual, statusNovo) => {
  try {
    const data = await prisma[entidade].updateMany({
      where: { status: statusAtual },  // Filtra por registros com o status atual
      data: { status: statusNovo },    // Atualiza o status para o novo valor
    });
    return data;
  } catch (error) {
    console.error(`Erro ao atualizar o status da entidade "${entidade}":`, error.message);
    throw new Error(`Erro ao atualizar o status da entidade "${entidade}"`);
  }
};