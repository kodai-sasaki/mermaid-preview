# Alpine から Debian ベースの軽量イメージに変更（glibc 互換問題を完全回避）
FROM debian:bookworm-slim

# mise のダウンロードに必要な curl と、pnpm 等が依存する git/ca-certificates のみインストール
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    git \
    libatomic1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# mise のインストール
RUN curl https://mise.run | sh
ENV PATH="/root/.local/bin:/root/.local/share/mise/shims:$PATH"

# 設定ファイルのコピーとツールのインストール
COPY .mise.toml ./
RUN mise install && mise reshim

# 依存関係のインストール
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
RUN pnpm install --no-frozen-lockfile
# RUN pnpm install --frozen-lockfile

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

EXPOSE 3000

CMD ["pnpm", "dev"]
