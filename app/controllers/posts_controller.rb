class PostsController < ApplicationController

  before_action :find_post, only: %i[ show edit update destroy ]
  before_action :authenticate_user!, only: %i[ new edit create update destroy ]
  # GET /posts or /posts.json
  def index
    @posts = Post.all.order(created_at: :desc)
    # @posts = Post.where(user_id: current_user.id)
  end

  # GET /posts/1 or /posts/1.json
  def show
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
    if current_user.id != @post.user_id
      redirect_to root_path, alert: "你不是原作者，無權編輯！"
    end

    @post.tag_list = @post.tags.pluck(:name).join(", ")
  end

  # POST /posts or /posts.json
  def create
    
    set_post_title
    @post = Post.new(title: @title, content: @content, user_id: current_user.id)
    add_tags_to_post

    if @post.save
      redirect_to posts_url, notice: "Post was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update

    @post.tags.clear
    set_post_title
    add_tags_to_post

    if @post.update(title: @title, content: @content, tags: @post.tags)
      redirect_to posts_url, notice: "Post was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1 or /posts/1.json
  def destroy
    @post.destroy

      redirect_to posts_url, notice: "Post was successfully destroyed."
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def find_post
    @post = Post.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def post_params
    params.require(:post).permit(:content, :tag_list, :status)
  end

  def set_post_title
    @title = ""

    @content = post_params[:content]
    lines = @content.split("\n")

    lines.each do |line|
      if line.start_with? "# "
        @title = line.sub("# ", "")
        break
      end
    end

    if @title.empty?
      @title = lines[0]
    end
  end

  def add_tags_to_post
    if !post_params[:tag_list].empty?
      tag_list = post_params[:tag_list].split(",")

      tag_list.each do |tag_name|
        tag = Tag.find_or_create_by(name: tag_name.downcase.strip.squish.gsub(/[^0-9A-Za-z]/,"_"))
        @post.tags << tag
      end
    end
  end  
  
end
