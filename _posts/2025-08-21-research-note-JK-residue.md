---
title: "Research Note: K-theoretic"
date: 2025-08-18
categories:
  - Physics
tags:
  - JK residue
layout: protected
protected: true
password_hash: "af7a3cc6b7617d07cb2d436c53b8398ba0a97cd19b183bea37d4cbedb2c066d1"
excerpt: "Supporting detail on K-theoretic"
---

# Path integral Contour

### Proof of JK prescription for rank one case
We are working on the proof for the JK residue formula in the rank one case. 
The path integral can be reduced to the following form

$$
Z= \lim_{e\to 0}\int_{\mathfrak{M}} \mathrm{d}^2 u \int_{\mathbb{R}} \mathrm{d} D f_{\mathrm{e}}(u, \bar{u}, D) \exp \left[-\frac{1}{2 \mathrm{e}^2} D^2-i \zeta D\right]
$$

where $e$ is the gauge coupling constant. 
Since the Lagrangian is $Q$-exact, we can use localization techniques by taking $e\to 0$ limit. 

We first integrating over $D$, the path integral will be

$$
Z_{T^2}=\lim_{e\to 0}\int_{\mathfrak{M}} \mathrm{d}^2 u F_{\mathrm{e}}(u, \bar{u})
$$

$F_{\mathrm{e}}(u, \bar{u})$ is a function depends on $e$, 
but after taking the integral, the dependence will disappear.

If we want to take $e\to 0$ limit before the $u$-integral, the dangerous region
will be around $u\in \mathfrak{M}_\text{sing}$. These are regions where the scalar
zero modes appear.

Let $\Delta_\epsilon$ be the $\epsilon$ neighborhood of $\mathfrak{M}_\text{sing}$. For fixed $\epsilon$, we seperate the integral as 

$$
Z_{T^2}=\lim_{e\to 0}\int_{\mathfrak{M} \backslash \Delta_{\varepsilon}} \mathrm{d}^2 u F_{\mathrm{e}}(u, \bar{u})+
\lim_{e\to 0}\int_{\Delta_{\varepsilon}} \mathrm{d}^2 u F_{\mathrm{e}, 0}(\bar{u})
$$

For the second term, we take the limit $\epsilon\to 0$ first for a non-zero $e$ and then take $e\to 0$. We can argue that, the second term will vanish. We left with

$$
Z_{T^2}=\lim _{\mathrm{e}, \varepsilon \rightarrow 0} \int_{\mathfrak{M} \backslash \Delta_{\varepsilon}} \mathrm{d}^2 u F_{\mathrm{e}}(u, \bar{u})
$$

