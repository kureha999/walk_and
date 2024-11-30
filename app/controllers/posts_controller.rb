class PostsController < ApplicationController
  # ログイン中のuserの身に投稿、編集できるように
  before_action :authenticate_user!, only: %i[new create]

  def index
    @posts = Post.includes(:user).order(created_at: :desc)
  end

  def new
    @post = Post.new
  end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      redirect_to posts_path, notice: "投稿が作成されました。"
    else
      flash.now[:alert] = "投稿に失敗しました。"
      render :new
    end
  end

  def show
    @post = Post.find(params[:id])
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.user == current_user
      @post.destroy
      redirect_to posts_path, notice: "投稿が削除されました。"
    else
      redirect_to posts_path, alert: "権限がありません。"
    end
  end

  private

  def post_params
    params.require(:post).permit(:body, :image)
  end
end
