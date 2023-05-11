
class TagsController < ApplicationController
  before_action :authenticate_user!, only: %i[ follow user_tags ]

  def show
    @tag = Tag.includes(:posts).find(params[:id])
    @tags = Tag.all
    if params[:keyword].present?
      @posts = @tag.posts.published.search(params[:keyword]).order(created_at: :desc).page(params[:page])
      if @posts.empty?
        flash.now[:notice] = "No results found for '#{params[:keyword]}'"
        @posts = @tag.posts.published.order(created_at: :desc).page(params[:page])
      end
    else
      @posts = @tag.posts.published.order(created_at: :desc).page(params[:page])
    end
  end

  def follow
    @tag = Tag.find(params[:id])

    if !current_user.tags.include?(@tag)
      current_user.tags << @tag
      redirect_to tag_path(@tag.id), notice: "已追蹤#{@tag.name}"
    else
      current_user.tags.delete(@tag)
      redirect_to tag_path(@tag.id), notice: "已退追蹤#{@tag.name}"
    end
  end

  def user_tags
    @tags = current_user.tags
  end

  private

  def sort_order
    case params[:order]
    when "desc"
      { created_at: :desc }
    when "asc"
      { created_at: :asc }
    end
  end
end
