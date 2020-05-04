export default (state = 0, action) => {
    switch (action.type) {
      case 'OLD':
        return "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2586717545,208974101&fm=26&gp=0.jpg"
      case 'NEW':
        return "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2312752237,2139833725&fm=26&gp=0.jpg"
      default:
        return "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2312752237,2139833725&fm=26&gp=0.jpg"
    }
  }