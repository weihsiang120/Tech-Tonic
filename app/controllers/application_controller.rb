class ApplicationController < ActionController::Base
    before_action :search
    def search
        @posts = Post.order(created_at: :desc)
        if params[:keyword].present?
            @posts = Post.where("title like ? or content like ?", "%#{keyword}%", "%#{keyword}%").order(created_at: :desc)
            if @posts.empty?
                flash.now[:notice] = "No results found for '#{params[:keyword]}'"
                @posts = Post.order(created_at: :desc)
            end
        end
    end
    
end
