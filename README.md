<img
  src="https://raw.githubusercontent.com/kube/vscode-42header/master/42.png" 
  width=128>

> **Searching for Maintainer.**
> 
> This project was done 7 years ago, which is an eternity relative to VSCode Lifespan.
> I don't have time to maintain this, but I see a lot of people doing Pull Requests for it, or creating issues.
> 
> As there are no Unit Tests and no CI/CD, it makes it even harder to check for issues and PRs.
>
> What I'd like to do is to give ownership to an "official" 42 organization on GitHub, where a group of students could maintain and update this project themselves.
>
> If you are interested in such a thing, please ping me.

# 42 Header for VSCode

This extension provides the 42 header integration in VS Code.

```bash
# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    vscode-42header                                    :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: kube <hello@kube.io>                       +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2013/11/18 13:37:42 by kube              #+#    #+#              #
#    Updated: 2016/09/18 13:11:04 by kube             ###   ########.fr        #
#                                                                              #
# **************************************************************************** #
```

## Install

Launch Quick Open with <kbd>⌘</kbd>+<kbd>P</kbd> and enter
```
ext install 42header
```

## Usage

### Insert a header
 - **macOS** : <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>H</kbd>
 - **Linux** / **Windows** : <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>H</kbd>.

Header is automatically updated on save.


## Configuration

Default values for **username** and **email** are imported from environment variables.

To override these values, specify these properties in *User Settings* :

```ts
{
  "42header.username": string,
  "42header.email": string
}
```


## Issues

In case of a bug, or missing feature, please create a [Github Pull Request](https://github.com/kube/vscode-42header/pulls).

## License

MIT
